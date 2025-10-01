import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content: "Decentralized Finance, or DeFi, is transforming how people interact with money. Built on blockchain technology, it removes the need for traditional banks by using smart contracts to deliver financial services directly. With DeFi, anyone with an internet connection can lend, borrow, trade, or invest without depending on intermediaries. Every transaction is recorded on a public blockchain, ensuring transparency, security, and fairness. By eliminating hidden costs and increasing accessibility, DeFi opens the door to a more inclusive global financial system, empowering people everywhere to take control of their finances.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content: "Artificial Intelligence (AI) is reshaping modern businesses by driving efficiency, innovation, and smarter decision-making. From chatbots that enhance customer service to algorithms that analyze big data for insights, AI helps companies save time and reduce costs. In manufacturing, it improves automation and quality control, while in finance, AI detects fraud and manages risks. Retailers use AI to personalize shopping experiences, and healthcare providers use it for faster diagnoses. By streamlining operations and creating new opportunities, AI is not just a tool but a transformative force shaping the future of global business.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content: "Sustainable living is about making choices that reduce harm to the planet while improving our quality of life. Small changes in daily habits can have a big impact. Using reusable bags, bottles, and containers helps cut down on plastic waste. Saving energy by switching off unused devices, using LED bulbs, or relying on public transport reduces carbon emissions. Choosing local and seasonal foods lowers environmental impact, while recycling and composting reduce household waste. By practicing eco-friendly habits, individuals can contribute to a healthier environment and a more sustainable future for generations to come.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CHALLENGE 1: GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// CHALLENGE 2: GET a specific post
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  const newId = ++lastId;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  posts.push(post);
  res.status(201).json(post);
});

// CHALLENGE 4: PATCH update
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// CHALLENGE 5: DELETE
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
