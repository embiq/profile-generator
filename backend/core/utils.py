import os
from typing import Optional, List


def env_bool(env_variable: str, default: Optional[bool] = None) -> bool:
    default_value = "true" if default else "false"
    return os.getenv(env_variable, default_value).lower() == "true"


def env_list(env_variable: str, default: Optional[List[str]] = None) -> List[str]:
    if items := os.getenv(env_variable):
        return items.split(",")
    return default
