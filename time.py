import zoneinfo

africa_tzs = [x for x in zoneinfo.available_timezones() if x.startswith("Africa/")]

print(len(africa_tzs))