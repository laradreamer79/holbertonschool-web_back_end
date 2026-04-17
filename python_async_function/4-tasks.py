#!/usr/bin/env python3
"""Concurrent task helpers for measuring task-based delays."""
import asyncio
from typing import List
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Run task_wait_random n times and return the delays in order.

    Args:
        n: Number of tasks to create.
        max_delay: Maximum random delay for each task.

    Returns:
        A list of delay values ordered from smallest to largest.
    """
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []
    for finished_task in asyncio.as_completed(tasks):
        delay = await finished_task
        delays.append(delay)

    return delays
