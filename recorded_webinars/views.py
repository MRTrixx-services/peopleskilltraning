from django.shortcuts import render, get_object_or_404
from .models import RecordedWebinar
from django.core.paginator import Paginator
from live_webinars.models import WebinarCategory, Instructor
from django.db.models import Q, Count

from django.core.cache import cache



def recorded_webinar_list(request):

    # Per Page
    per_page = request.GET.get("per_page", 12)
    try:
        per_page = int(per_page)
        if per_page < 1:
            per_page = 12
    except (ValueError, TypeError):
        per_page = 12

    # Base Queryset
    queryset = (
        RecordedWebinar.objects
        .select_related("instructor", "category", "pricing")
        .filter(is_published=True)
        .order_by("-created_at")
    )

    # Search
    search_query = request.GET.get("search", "").strip()

    if search_query:
        queryset = queryset.filter(
            Q(title__icontains=search_query) |
            Q(instructor__name__icontains=search_query)
        )

    # Category Filter
    category_ids = request.GET.getlist("category")
    category_ids = [
        value for value in category_ids
        if value.isdigit()
    ]

    if category_ids:
        queryset = queryset.filter(category_id__in=category_ids)

    # Instructor Filter
    instructor_ids = request.GET.getlist("instructor")
    instructor_ids = [
        value for value in instructor_ids
        if value.isdigit()
    ]

    if instructor_ids:
        queryset = queryset.filter(instructor_id__in=instructor_ids)

    # Month Filter
    month = request.GET.get("month", "").strip()

    if month:
        try:
            month_number = int(month)

            if 1 <= month_number <= 12:
                queryset = queryset.filter(
                    created_at__month=month_number
                )
        except (ValueError, TypeError):
            pass

    # Available Months
    available_months = (
        RecordedWebinar.objects
        .filter(is_published=True)
        .dates("created_at", "month")
    )

    # Active Filters
    filters_active = any([
        search_query,
        category_ids,
        instructor_ids,
        month,
    ])

    # Pagination
    paginator = Paginator(queryset, per_page)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    # Categories
    categories = (
        WebinarCategory.objects
        .annotate(
            webinar_count=Count(
                "recorded_webinars",
                filter=Q(recorded_webinars__is_published=True)
            )
        )
    )

    # Instructors
    instructors = (
        Instructor.objects
        .annotate(
            webinar_count=Count(
                "recorded_webinars",
                filter=Q(recorded_webinars__is_published=True)
            )
        )
    )

    context = {
        "webinars": page_obj.object_list,
        "page_obj": page_obj,
        "per_page": per_page,
        "categories": categories,
        "instructors": instructors,
        "selected_categories": category_ids,
        "selected_instructors": instructor_ids,
        "selected_month": month,
        "search_query": search_query,
        "available_months": available_months,
        "filters_active": filters_active,
    }

    return render(
        request,
        "recorded_webinars/recorded_list.html",
        context
    )

def recorded_webinar_detail(request, webinar_id):

    cache_key = f"recorded_detail_{webinar_id}"

    webinar = cache.get(cache_key)

    if not webinar:
        webinar = get_object_or_404(
            RecordedWebinar.objects.select_related(
                "category",
                "instructor",
                "pricing",
            ),
            webinar_id=webinar_id,
            is_published=True
        )

        cache.set(cache_key, webinar, 300)

    return render(
        request,
        "recorded_webinars/recorded_detail.html",
        {"webinar": webinar}
    )

