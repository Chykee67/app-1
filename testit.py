def my_decorator(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        result = int(result) + 1
        return result
    return wrapper

@my_decorator
def calc(a, b):
    return f"{a+b}"

print(calc(2, 3))