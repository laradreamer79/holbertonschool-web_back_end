# Pagination

This project focuses on implementing different pagination techniques in Python for backend applications. Pagination is essential when working with large datasets because it improves performance, reduces memory usage, and provides a better user experience when retrieving data from APIs or databases.

## Project Overview

In backend systems, returning an entire dataset at once can be inefficient and slow, especially when handling thousands of records. Pagination solves this by splitting data into manageable chunks (pages), allowing clients to request only the data they need.

This project covers:
- Basic pagination using page numbers and page sizes
- Building helper functions for index calculations
- Returning pagination metadata (hypermedia)
- Designing pagination that remains stable even if records are deleted

---

## Learning Objectives

By the end of this project, you should be able to explain:

- How to paginate a dataset with simple page and page size parameters
- How to calculate start and end indexes for a dataset
- How to implement server-side pagination
- How to provide metadata to clients for easier navigation
- How to design deletion-resilient pagination systems
- Best practices for API pagination design

---

## Project Structure

| File | Description |
|------|-------------|
| `0-simple_helper_function.py` | Helper function for pagination index calculations |
| `1-simple_pagination.py` | Basic pagination implementation |
| `2-hypermedia_pagination.py` | Pagination with metadata |
| `3-hypermedia_del_pagination.py` | Deletion-resilient pagination |

---

# Tasks

## Task 0: Simple Helper Function

**File:** `0-simple_helper_function.py`

This task introduces the foundation of pagination.

You will create a helper function called `index_range(page, page_size)` that calculates the correct start and end indexes for a given page.

### Purpose
Instead of manually calculating indexes every time pagination is needed, this reusable helper function simplifies the process.

### Example
If:

```python
page = 3
page_size = 10
```
Then:
```python
start_index = 20
end_index = 30
```

Because:
- Page 1 → items 0–9
- Page 2 → items 10–19
- Page 3 → items 20–29

### Key Concept
Formula:
```python
start = (page - 1) * page_size
end = page * page_size
```

### Task 1: Simple Pagination

File: 1-simple_pagination.py

This task builds a pagination system for a dataset.

You will:

Load a dataset (CSV file)
Cache the dataset for efficiency
Create a method that returns only the requested page
Features
Input validation using assertions
Efficient dataset loading
Returns only the requested slice of data

### Example

Request:
  ```python
get_page(page=2, page_size=5)
```
Output:
```python
[
  ["record 6"],
  ["record 7"],
  ["record 8"],
  ["record 9"],
  ["record 10"]
]

### Concepts Covered
- Dataset slicing
- Assertions
- Caching data in memory
- Server-side pagination
```

### Task 2: Hypermedia Pagination

File: 2-hypermedia_pagination.py

This task improves pagination by returning metadata alongside the actual data.

Instead of returning only records, the API also provides navigation details.

### Features

Returns:

- Current page
- Page size
- Total pages
- Next page
- Previous page
- Data

### Example Response

```python
{
  "page_size": 10,
  "page": 2,
  "data": [...],
  "next_page": 3,
  "prev_page": 1,
  "total_pages": 12
}
```

### Why This Matters

Clients using the API can easily:

- Move to the next page
- Return to previous pages
- Know how many total pages exist

This improves API usability significantly.

### Concepts Covered
API metadata
JSON-friendly responses
Navigation logic
Total page calculation

Formula:
```python
math.ceil(total_items / page_size)
```
### Task 3: Deletion-Resilient Hypermedia Pagination

File: 3-hypermedia_del_pagination.py

This is the most advanced pagination task.

Traditional pagination breaks if items are deleted because page indexes shift.

### Example:
If item 15 is deleted:

Page 2 may suddenly skip or repeat records

This task solves that issue.

### Features
- Stable pagination even after deletions
- Uses indexed dataset mapping
- Avoids missing records
- Consistent client experience
- 
### Example Problem

Before deletion:

```python
Index 10 → Record A
Index 11 → Record B
Index 12 → Record C
```

After deleting Record B:
```python
Index 10 → Record A
Index 11 → missing
Index 12 → Record C
```

A resilient paginator skips missing indexes instead of breaking.

```python
Returns
{
  "index": 10,
  "next_index": 15,
  "page_size": 5,
  "data": [...]
}
```

### Concepts Covered
- Indexed datasets
- Dictionary mapping
- Fault-tolerant pagination
- Handling dynamic datasets

### How to Run

Run a file:

```python
python3 0-simple_helper_function.py
```

### Example testing:

```python
./0-main.py
./1-main.py
./2-main.py
./3-main.py
```

### Check style:
```python
pycodestyle *.py
```

### Real-World Use Cases

Pagination is widely used in:

- REST APIs
- E-commerce product listings
- Social media feeds
- Search results
- Admin dashboards
- Database query systems

### Examples:

- Amazon product pages
- Instagram post feeds
- GitHub repository listings
- Google search pages

### Key Takeaways

This project demonstrates how pagination evolves from simple slicing to production-ready API behavior.

Progression:

- Helper function for index calculation
- Basic dataset pagination
- Hypermedia metadata support
- Deletion-resilient pagination

By completing this project, you gain practical backend skills used in real API development.

### Author

Lara
Holberton School


