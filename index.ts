import createDatabase from './createDatabase';
import notion from './notion';

const main = async () => {
  const databaseId = await createDatabase();
  //falta agora chamar o letterboxd e tentar tambem gerar as propriedades do createdatabase pelo resultado do letterboxd sao duas tabelas, watchlist e watched
};

main();
