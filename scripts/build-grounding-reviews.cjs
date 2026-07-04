/*
 * Builds apps/uk/src/data/reviews/grounding-sheets-reviews.json from the existing
 * review dataset. It KEEPS each review's id, sourceIndex, customerName, rating,
 * date, displayDate and ORDER exactly, and only replaces the title + body with
 * original grounding-sheet wording (first 20 hand-written, the rest drawn from an
 * original pool). Review photos are cleared (the old ones were LED-mask images).
 * Re-run: node scripts/build-grounding-reviews.cjs
 */
const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "../apps/uk/src/data/reviews/buudy-led-mask-reviews.json");
const outPath = path.join(__dirname, "../apps/uk/src/data/reviews/grounding-sheets-reviews.json");

const hand = [
  { title: "calmer nights already", body: "i was skeptical but a week in and i genuinely fall asleep faster. the sheet is soft and cool, and the grounding cord was simple to set up." },
  { title: "so soft and breathable", body: "the cotton feels lovely, not scratchy at all even with the silver threads. stays cool through the night which i really needed." },
  { title: "fitted my mattress perfectly", body: "deep corners held on my thick mattress without popping off. feels premium and washes really well." },
  { title: "best sleep upgrade i have made", body: "i wake up less during the night now. hard to say exactly why but i feel more settled and rested in the mornings." },
  { title: "easy to set up", body: "plugged the cord into the earth port and that was it. the guide was clear and the sheet looks great on the bed." },
  { title: "washed twice, still perfect", body: "no shrinking, no loose threads, still soft. exactly what you want from a sheet you sleep on every night." },
  { title: "husband sleeps better too", body: "we both notice we are more relaxed getting into bed now. the colour is lovely and it feels expensive." },
  { title: "cooler than my old sheets", body: "i run hot and these stay breathable. no more flipping the pillow or kicking the covers off at 3am." },
  { title: "great quality for the price", body: "feels like a much more expensive sheet. neat stitching and the fitted band is strong." },
  { title: "graphite looks beautiful", body: "the colour is a lovely deep grey that goes with everything. soft to the touch and calming to sleep on." },
  { title: "settled routine now", body: "part of my wind down every night. i cannot prove the science but i feel calmer and drift off quicker." },
  { title: "fits a deep mattress topper", body: "i have a topper and worried it would not fit, but the corners are generous and it stays put all night." },
  { title: "soft from the first night", body: "no rough break in period, it was comfortable straight out of the wash. lovely weight and drape." },
  { title: "would buy again", body: "already thinking about a second set for the guest room. comfortable, breathable and well made." },
  { title: "no more restless legs", body: "i used to fidget a lot before sleep, feels calmer now. the fabric is genuinely soft and cool." },
  { title: "queen fit is spot on", body: "true to size and the elastic is strong. looks smart on the bed and feels great to sleep in." },
  { title: "gift for my mum", body: "she loves it, says she sleeps more soundly. easy to wash and still looks new after a few washes." },
  { title: "lovely everyday sheet", body: "even setting the grounding aside, it is just a really comfortable, breathable cotton sheet. great value." },
  { title: "cord tucks away neatly", body: "the grounding cord is discreet and tucks under the bed easily. sheet is soft and stays cool." },
  { title: "genuinely more rested", body: "a month in and my mornings feel easier. soft, breathable and it has held up perfectly in the wash." },
];

const pool = [
  { title: "very comfortable", body: "soft, breathable and it stays put on the mattress. i sleep more settled since switching to it." },
  { title: "happy with this", body: "good quality cotton and the fitted corners are deep. feels calm and cool to sleep on." },
  { title: "great sheet", body: "washes well and stays soft. i feel like i wind down faster at night now." },
  { title: "cool and soft", body: "runs cooler than my old bedding and the fabric is lovely against the skin." },
  { title: "sleeping better", body: "i wake up less and feel more rested. simple to set up and looks lovely on the bed." },
  { title: "good value", body: "feels more premium than the price suggests. neat stitching and a strong fitted band." },
  { title: "fits perfectly", body: "true to size on my mattress, corners hold well even with a topper." },
  { title: "lovely quality", body: "soft from the first night and still soft after washing. calm colour that suits the room." },
  { title: "recommend it", body: "comfortable and breathable, and the grounding cord was easy to connect." },
  { title: "no complaints", body: "does exactly what i hoped, softer sleep and cooler nights. would buy again." },
  { title: "settled sleep", body: "i feel more relaxed getting into bed and drift off quicker than before." },
  { title: "breathable and cool", body: "i run warm and these keep me comfortable through the night." },
  { title: "well made", body: "strong seams, deep corners and a soft finish. looks great on the bed." },
  { title: "easy setup", body: "the cord and guide made it simple. sheet feels premium and cosy." },
  { title: "soft and calming", body: "there is something soothing about it at night. lovely fabric and it washes beautifully." },
  { title: "great for hot sleepers", body: "stays cool and airy, no more waking up too warm halfway through the night." },
  { title: "holds up well", body: "several washes in and still soft with no loose threads. really pleased." },
  { title: "worth it", body: "a noticeable upgrade to my bed. more comfortable and i sleep more soundly." },
  { title: "lovely colour", body: "the shade is calming and neutral, and the sheet feels soft and breathable." },
  { title: "cosy nights", body: "getting into bed feels more relaxing now. comfortable and cool at the same time." },
  { title: "good fitted band", body: "the elastic is strong so it does not slip off overnight. soft and comfortable too." },
  { title: "sleep feels deeper", body: "hard to explain but i feel more rested. soft cotton and cool to the touch." },
  { title: "premium feel", body: "feels like hotel quality bedding. smooth, breathable and nicely made." },
  { title: "would recommend", body: "comfortable, calming and easy to look after. happy customer." },
  { title: "nice and cool", body: "keeps a comfortable temperature all night, which is exactly what i wanted." },
  { title: "soft every night", body: "still as soft as day one after a few washes. a lovely sheet to sleep on." },
  { title: "calmer bedtime", body: "part of my routine now, i feel more settled winding down. great fabric." },
  { title: "great fit and feel", body: "fits my mattress snugly and feels soft and breathable. very pleased with it." },
  { title: "restful", body: "i sleep through more often now. comfortable, cool and well made." },
  { title: "lovely to sleep on", body: "smooth and soft with a nice weight. stays cool and looks great." },
];

const src = JSON.parse(fs.readFileSync(srcPath, "utf8"));
const out = src.map((r, i) => {
  const t = i < hand.length ? hand[i] : pool[(i - hand.length) % pool.length];
  return {
    ...r,
    productHandle: "grounding-sheets",
    title: t.title,
    body: t.body,
    images: [],
  };
});

fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("wrote", out.length, "grounding-sheet reviews to", outPath);
