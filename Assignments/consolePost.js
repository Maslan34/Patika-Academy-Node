const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const posts = [
  { name: "Post 1", author: "Author 1" },
  { name: "Post 2", author: "Author 2" },
  { name: "Post 3", author: "Author 3" },
];

const listPost = () => {
  console.log("\n");
    posts.map((post) => {
    console.log(post.name);
  });
};

const addPost = () => {
    rl.question("Please Enter Post Name: ", (postName) => {
      rl.question("Please Enter Post Author: ", (postAuthor) => {
        posts.push({ name: postName, author: postAuthor });
        console.log(`Post Added: ${postName} - ${postAuthor}\n`);
        proceed(); 
      });
    });
  };

async function proceed() {
  rl.question("\n\n1- Add Post\n2-List Post\n3-Exit\n", async (userInput) => {
    if (Number(userInput) === 1) {
      await addPost(); // Adding a new post
    } else if (Number(userInput) === 2) {
      listPost(); // Listing posts
    } else if (Number(userInput) === 3) {
      rl.close(); // Exit
      return;
    } else {
      console.log("Wrong Input, Please Try Again.");
    }
    proceed();
  });
}

console.log("Please Enter A Number To Proceed");
proceed();
