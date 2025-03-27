from slugify import slugify

txt = input('Enter a task title: ')

print(slugify(txt, lowercase=False))