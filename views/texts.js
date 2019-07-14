export const texts = [
    {
        "type": "think",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        "type": "talk",
        "text": "99 little bugs in the code 🎵\ud83c\udfb5\n" +
            "Take one down, patch it around 🎵\ud83c\udfb5\n" +
            "127 little bugs in the code \ud83c\udfb5"
    },
    {
        "type": "think",
        "cron": [
            "00:00-10:30",
            "19:00-24:00",
        ],
        "text": "Better get some ☕ soon"
    },
    {
        "type": "talk",
        "text": "Do I smell pizza \ud83c\udf55?"
    },
    {

        "type": "talk",
        "text": "It compiles? Ship it!"
    },
    {

        "type": "think",
        "text": "Life would be so much easier if we only had the source code..."
    },
    {

        "type": "talk",
        "text": "My software never has bugs. It just develops random features."
    },
    {

        "type": "talk",
        "text": "The only problem with troubleshooting is that sometimes trouble shoots back"
    },
    {

        "type": "talk",
        "text": "It is user-friendly! It's just very selective about who its friends are"
    },
    {

        "type": "talk",
        "text": "The world is coming to an end... SAVE YOUR BUFFERS!"
    },
    {

        "type": "think",
        "text": "Better check kitchen for some snacks"
    },
    {

        "type": "think",
        "text": "It is this hour already?"
    },

    {

        "type": "talk",
        "text": "I got such pretty face"
    },
    {

        "type": "talk",
        "text": "Gotta catch 'Em all \ud83d\udc1b"
    },
    {

        "type": "think",
        "text": "Where was I going again?"
    },
    {
        "function": true,
        "type": "talk",
        "text": "Just n seconds until weekend"
    },
    {

        "type": "think",
        "text": "A mogłem być hydraulikiem..."
    },
    {
        "type": "talk",
        "text": "404"
    },
    {
        "type": "think",
        "text": "Work in IT, they said. It will be FUN, they said."
    },
    {
        "type": "think",
        "text": "What  was the deadline again?"
    },
    {
        "type": "think",
        "text": "☕",
    },
    {
        "type": "think",
        "text": "They still use Internet Explorer?!",
    },
    {
        "type": "speak",
        "text": "It works on my machine",
    },
    {
        "type": "speak",
        "text": "No code, no bugs",
    },
    {
        "type": "speak",
        "text": "SYN",
    },
    {
        "type": "think",
        "text": "Computers make very fast, very accurate mistakes",
    },
    {
        "type": "speak",
        "text": "GET /coffee",
    },
    {
        "type": "speak",
        "text": "The best thing about a boolean is even if you are wrong, you are only off by a bit",
    },
    {
        "type": "speak",
        "text": "There's no test like production 😈",
    },
    {
        "type": "speak",
        "text": "There's nothing quite so permanent as a quick fix",
    },
    {
        "type": "speak",
        "text": "There's nothing quite so permanent as a quick fix",
    }
];


function randomInRange(min, max) {
  (Math.random() * (max - min + 1)) << 0
}

function getRandomText() {
  max = texts.length - 1;
  randomIndex = randomInRange(0, max);
  return texts[randomIndex];
}
