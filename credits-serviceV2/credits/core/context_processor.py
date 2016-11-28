def myurl( request ):
  return { 'myurlx': request.get_full_path() }