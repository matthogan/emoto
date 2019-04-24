# Test Aylien endpoints

Populate var

```bash
value=$(<book.txt)
```

Invoke ELSA.
```bash
curl https://api.aylien.com/api/v1/elsa \
    -H "X-AYLIEN-TextAPI-Application-Key: <<go to aylien.com>>" \
    -H "X-AYLIEN-TextAPI-Application-ID: <<go to aylien.com>>" \
    --data-urlencode "text=The+Sistine+Chapel+is+beautiful+but+Venice+smells+really+bad"
```

```bash
curl https://api.aylien.com/api/v1/elsa \
    -H "X-AYLIEN-TextAPI-Application-Key: <<go to aylien.com>>" \
    -H "X-AYLIEN-TextAPI-Application-ID: <<go to aylien.com>>" \
    --data-urlencode "text=How many roads must a man walk down before they call him a man?"
Finally, his body responded and the head faded from view as he jumped out of the bed. He stared at the space where her head had floated like a dream's afterimage. She had embedded herself within his mind so deeply that he dreamt about her, surely, rather than give her head the ability to detach itself and fly for miles and vanish at will. Even the walls of the fortress-like hospital failed under an assault from that insubstantial wraith. He sank to his knees, pressed his head into the crumpled duvet, and breathed. Being alone in there hurt more than being outside.
```

Invoke summary call.
```bash
curl https://api.aylien.com/api/v1/summarize \
    -H "X-AYLIEN-TextAPI-Application-Key: <<go to aylien.com>>" \
    -H "X-AYLIEN-TextAPI-Application-ID: <<go to aylien.com>>" \
    --data-urlencode "text=$value" \
    --data-urlencode "title=Book excerpt"
```

