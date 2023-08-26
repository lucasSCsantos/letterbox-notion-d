import notion from './notion';
import fs from 'fs';

const createDatabase = async () => {
  try {
    //
    const json = fs.readFileSync('database.json');
    const { id } = JSON.parse(json.toString());

    if (id) {
      const dbAlreadyExists = await notion.databases.retrieve({
        database_id: id,
      });

      if (dbAlreadyExists) {
        return id;
      }
    }

    const movieDb = await notion.databases.create({
      parent: {
        page_id: '51bacd82938d44d281b6932eb8fac08e',
        type: 'page_id',
      },
      title: [
        {
          type: 'text',
          text: { content: 'Watchlist' },
        },
      ],
      icon: {
        type: 'emoji',
        emoji: '🎥',
      },
      properties: {
        Name: {
          title: {},
        },
        Summary: {
          rich_text: {},
        },
        'Directed By': {
          rich_text: {},
        },
        Duration: {
          number: {},
        },
        Year: {
          number: {},
        },
        Ratings: {
          number: {},
        },
        'Where to Watch': {
          multi_select: {
            options: [
              {
                name: 'Netflix',
                color: 'red',
              },
              {
                name: 'Disney Plus',
                color: 'blue',
              },
              {
                name: 'Amazon Prime',
                color: 'gray',
              },
              {
                name: 'HBO Max',
                color: 'purple',
              },
            ],
          },
        },
      },
    });

    fs.writeFileSync('database.json', JSON.stringify({ id: movieDb.id }));
    return movieDb.id;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default createDatabase;
