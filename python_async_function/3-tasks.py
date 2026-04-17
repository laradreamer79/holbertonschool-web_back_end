#!/usr/bin/env python3
"""Task helpers for wrapping wait_random in asyncio tasks."""

import asyncio

wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Create an asyncio task that waits for a random delay.

    Args:
        max_delay: Maximum random delay for the underlying coroutine.

    Returns:
        An asyncio.Task object wrapping wait_random(max_delay).
    """
    return asyncio.create_task(wait_random(max_delay))
