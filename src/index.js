import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

config();

async function startServer() {
    const app = express();

    const typeDefs = `
      type Query {
        hello: String
        id: String
        name: String
        getStudents: [Students]

      }
      type Students {
       name:String
       course:String
      }
    `;

    const resolvers = {
        Query: {
            hello: () => "hello world",
            id: () => "1",
            name: () => "Aman",
            getStudents:()=>[{name:"devansh",course:"btech"}]
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    app.use(express.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server running at http://localhost:8000");
    });
}

startServer();
