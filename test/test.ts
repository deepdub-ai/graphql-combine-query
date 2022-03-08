import combineQuery from "../src";
import chalk from "chalk";
import * as mutations from "./mutations";
import gql from "graphql-tag";
import { print } from "graphql/language/printer";

const combinedQuery = combineQuery("FooBarQuery");

let doc: any;
let vars: any;

const createTrack = gql`
  ${mutations.createTrack}
`;
const updateTrack = gql`
  ${mutations.updateTrack}
`;
const deleteTrack = gql`
  ${mutations.deleteTrack}
`;

// for (const query of queriesQueue) {
// }
const addNResult = combinedQuery.addN(createTrack, [
  { input: { id: "1" } },
  { input: { id: "2" } },
]);

const addAssortedResult = combinedQuery.addAssorted(
  [createTrack, updateTrack],
  [{ input: { id: "1" } }, { input: { id: "2" } }]
);

console.log(chalk.cyan("Add N:\n"));
console.log(print(addNResult.document));
console.log(addNResult.variables);

console.log(chalk.cyan("\nAdd Assorted:\n"));
console.log(print(addAssortedResult.document));
console.log(addAssortedResult.variables);
