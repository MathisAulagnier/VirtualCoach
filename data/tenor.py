import requests
import json

# set the apikey and limit
apikey = "LIVDSRZULELA"  # test value
lmt = 8

# our test search
search_term = "benchpress_bench_press"

# get the top 8 GIFs for the search term
r = requests.get(
    "https://g.tenor.com/v1/search?q=%s&key=%s&limit=%s" % (search_term, apikey, lmt))

if r.status_code == 200:
    # load the GIFs using the urls for the smaller GIF sizes
    top_8gifs = json.loads(r.content)
    # print que le premier gif
    # print(top_8gifs['results'][0]['url'])
    # print(top_8gifs)
    # print le premier element possédent une clé preview
    for i in top_8gifs['results']:
        print(i)
        break
    # print(top_8gifs['results'][0]['preview'])
else:
    top_8gifs = None
