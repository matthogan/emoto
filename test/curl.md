
Populate var

value=$(<book.txt)


curl https://api.aylien.com/api/v1/elsa \
   -H "X-AYLIEN-TextAPI-Application-Key: YOUR_APP_KEY" \
   -H "X-AYLIEN-TextAPI-Application-ID: YOUR_APP_ID" \
   -d text="Barcelona+is+an+awesome+destination"

curl https://api.aylien.com/api/v1/elsa \
    -H "X-AYLIEN-TextAPI-Application-Key: 97d6013e54853be7bea03f99506f6194" \
    -H "X-AYLIEN-TextAPI-Application-ID: 3af81c77" \
    --data-urlencode "text=The+Sistine+Chapel+is+beautiful+but+Venice+smells+really+bad"

curl https://api.aylien.com/api/v1/elsa \
    -H "X-AYLIEN-TextAPI-Application-Key: 97d6013e54853be7bea03f99506f6194" \
    -H "X-AYLIEN-TextAPI-Application-ID: 3af81c77" \
    --data-urlencode "text=How many roads must a man walk down before they call him a man?"
Finally, his body responded and the head faded from view as he jumped out of the bed. He stared at the space where her head had floated like a dream's afterimage. She had embedded herself within his mind so deeply that he dreamt about her, surely, rather than give her head the ability to detach itself and fly for miles and vanish at will. Even the walls of the fortress-like hospital failed under an assault from that insubstantial wraith. He sank to his knees, pressed his head into the crumpled duvet, and breathed. Being alone in there hurt more than being outside.


curl https://api.aylien.com/api/v1/summarize \
    -H "X-AYLIEN-TextAPI-Application-Key: 97d6013e54853be7bea03f99506f6194" \
    -H "X-AYLIEN-TextAPI-Application-ID: 3af81c77" \
    --data-urlencode "text=$value" \
    --data-urlencode "title=Book excerpt"

