const https = require('https');
// Holds all the decks - Set with a testing deck
const allDecks = {
  test: {
    deck: '{"deck":"[{\\"card\\":{\\"object\\":\\"card\\",\\"id\\":\\"7776b3cb-0410-4d9c-958f-3ea042f9eaea\\",\\"oracle_id\\":\\"b7a16caa-96e0-40c5-8fcb-81e06d26f92a\\",\\"multiverse_ids\\":[438475],\\"tcgplayer_id\\":149280,\\"name\\":\\"Brute Strength\\",\\"lang\\":\\"en\\",\\"released_at\\":\\"2017-10-24\\",\\"uri\\":\\"https://api.scryfall.com/cards/7776b3cb-0410-4d9c-958f-3ea042f9eaea\\",\\"scryfall_uri\\":\\"https://scryfall.com/card/ddt/35/brute-strength?utm_source=api\\",\\"layout\\":\\"normal\\",\\"highres_image\\":true,\\"image_uris\\":{\\"small\\":\\"https://c1.scryfall.com/file/scryfall-cards/small/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.jpg?1592764756\\",\\"normal\\":\\"https://c1.scryfall.com/file/scryfall-cards/normal/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.jpg?1592764756\\",\\"large\\":\\"https://c1.scryfall.com/file/scryfall-cards/large/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.jpg?1592764756\\",\\"png\\":\\"https://c1.scryfall.com/file/scryfall-cards/png/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.png?1592764756\\",\\"art_crop\\":\\"https://c1.scryfall.com/file/scryfall-cards/art_crop/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.jpg?1592764756\\",\\"border_crop\\":\\"https://c1.scryfall.com/file/scryfall-cards/border_crop/front/7/7/7776b3cb-0410-4d9c-958f-3ea042f9eaea.jpg?1592764756\\"},\\"mana_cost\\":\\"{1}{R}\\",\\"cmc\\":2,\\"type_line\\":\\"Instant\\",\\"oracle_text\\":\\"Target creature gets +3/+1 and gains trample until end of turn.\\",\\"colors\\":[\\"R\\"],\\"color_identity\\":[\\"R\\"],\\"keywords\\":[],\\"legalities\\":{\\"standard\\":\\"not_legal\\",\\"future\\":\\"not_legal\\",\\"historic\\":\\"legal\\",\\"pioneer\\":\\"legal\\",\\"modern\\":\\"legal\\",\\"legacy\\":\\"legal\\",\\"pauper\\":\\"legal\\",\\"vintage\\":\\"legal\\",\\"penny\\":\\"legal\\",\\"commander\\":\\"legal\\",\\"brawl\\":\\"not_legal\\",\\"duel\\":\\"legal\\",\\"oldschool\\":\\"not_legal\\"},\\"games\\":[\\"paper\\"],\\"reserved\\":false,\\"foil\\":false,\\"nonfoil\\":true,\\"oversized\\":false,\\"promo\\":false,\\"reprint\\":true,\\"variation\\":false,\\"set\\":\\"ddt\\",\\"set_name\\":\\"Duel Decks: Merfolk vs. Goblins\\",\\"set_type\\":\\"duel_deck\\",\\"set_uri\\":\\"https://api.scryfall.com/sets/c77df674-0ef5-47d9-ab22-56a6e1dc901c\\",\\"set_search_uri\\":\\"https://api.scryfall.com/cards/search?order=set&q=e%3Addt&unique=prints\\",\\"scryfall_set_uri\\":\\"https://scryfall.com/sets/ddt?utm_source=api\\",\\"rulings_uri\\":\\"https://api.scryfall.com/cards/7776b3cb-0410-4d9c-958f-3ea042f9eaea/rulings\\",\\"prints_search_uri\\":\\"https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ab7a16caa-96e0-40c5-8fcb-81e06d26f92a&unique=prints\\",\\"collector_number\\":\\"35\\",\\"digital\\":false,\\"rarity\\":\\"common\\",\\"flavor_text\\":\\"It\'s not the size of the rock. It\'s how badly you want to lift it.\\",\\"card_back_id\\":\\"0aeebaf5-8c7d-4636-9e82-8c27447861f7\\",\\"artist\\":\\"Wayne Reynolds\\",\\"artist_ids\\":[\\"afc47cec-3ccc-404e-a8c6-4d83dd504271\\"],\\"illustration_id\\":\\"ad63618e-a9a1-4f16-a23a-db47129c6246\\",\\"border_color\\":\\"black\\",\\"frame\\":\\"2015\\",\\"full_art\\":false,\\"textless\\":false,\\"booster\\":false,\\"story_spotlight\\":false,\\"edhrec_rank\\":3903,\\"prices\\":{\\"usd\\":\\"0.09\\",\\"usd_foil\\":null,\\"eur\\":\\"0.04\\",\\"tix\\":null},\\"related_uris\\":{\\"gatherer\\":\\"https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=438475\\",\\"tcgplayer_decks\\":\\"https://decks.tcgplayer.com/magic/deck/search?contains=Brute+Strength&page=1&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall\\",\\"edhrec\\":\\"https://edhrec.com/route/?cc=Brute+Strength\\",\\"mtgtop8\\":\\"https://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Brute+Strength\\"},\\"purchase_uris\\":{\\"tcgplayer\\":\\"https://shop.tcgplayer.com/product/productsearch?id=149280&utm_campaign=affiliate&utm_medium=api&utm_source=scryfall\\",\\"cardmarket\\":\\"https://www.cardmarket.com/en/Magic/Products/Singles/Duel-Decks-Merfolk-vs-Goblins/Brute-Strength?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall\\",\\"cardhoarder\\":\\"https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Brute+Strength&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall\\"}}}]"}',
    id: '"test"',
  },
};
// For Get Requests
const sendJSON = (request, response, status, content) => {
  const messageToSend = JSON.stringify(content);
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(messageToSend);
  response.end();
};
// For Head Requests
const sendJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Not found requests
const notFound = (request, response) => {
  // create json object
  const JSONObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  // send response of type json with content of string
  return sendJSON(request, response, 404, JSONObj);
};
// Head request for not found
const notFoundMeta = (request, response) => sendJSONMeta(request, response, 404);

// Get card requests
const getCard = (request, response, params) => {
  // Get search parameter
  const searchString = params.q;
  // create url
  const url = `https://api.scryfall.com/cards/search?q=${searchString}`;
  // Create response callback
  const responseRecieved = (res) => {
    let data = '';
    // Add data
    res.on('data', (d) => {
      data += d;
    });
    // Use completed data and return it
    res.on('end', () => {
      const returnedItems = JSON.parse(data);

      const toSend = {};
      if (returnedItems.data) {
        const test = returnedItems.data[0];
        toSend.card = test;
        return sendJSON(request, response, 200, toSend);
      }
      return sendJSON(request, response, 204, toSend);
    });
  };
  // Start request
  https.get(url, responseRecieved).end();
};
// Head request for get card
const getCardMeta = (request, response) => sendJSONMeta(request, response, 200);

// Get user requests (Needs to fix JSON to make parsing it easier, add checking for deck existing)
const getDeck = (request, response, params) => {
  // Create json to send
  const responseJSON = {
    deck: allDecks[params.q],
  };
  // Send response
  return sendJSON(request, response, 200, responseJSON);
};
// Head request for get deck
const getDeckMeta = (request, response) => sendJSONMeta(request, response, 200);

// Save deck requests
const saveDeck = (request, response, body) => {
  const responseJSON = {
    message: 'ID and deck is required',
  };
  // If either form field is empty
  if (!body.id || !body.deck) {
    responseJSON.id = 'missingParams';
    return sendJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;
  // if deck with id already exists
  if (allDecks[body.id]) {
    responseCode = 204;
  } else {
  // If deck does not exist create new deck on id
    allDecks[body.id] = {};
    allDecks[body.id].id = body.id;
  }
  // Set deck
  allDecks[body.id].deck = body.deck;
  // send correct response based on status code
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return sendJSON(request, response, responseCode, responseJSON);
  }

  responseJSON.message = 'Updated Successfully';
  return sendJSONMeta(request, response, responseCode);
};

module.exports = {
  notFound,
  notFoundMeta,
  getDeck,
  getDeckMeta,
  getCard,
  getCardMeta,
  saveDeck,
};
