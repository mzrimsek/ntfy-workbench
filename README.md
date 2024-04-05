# NTFY Workbench

## Running the app

### Locally

1. Install dependencies

```shell
npm install
```

2. Create a `config.json` file and drop it in the config folder. See the example below.

#### Example config.json

```json
{
  "tags": ["tag1", "tag2"],
  "topics": [
    {
      "name": "test",
      "description": "test description",
      "tags": ["tag1"]
    },
    {
      "name": "test2",
      "description": "test description",
      "tags": ["tag1", "tag2"]
    },
    {
      "name": "test3"
    }
  ],
  ,
  "ntfy": {
    "url": "https://ntfy.sh",
    "apiKey": "your-api-key"
  }
}
```

3. Start the app

```shell
npm run dev
```

### Docker

#### Docker Compose

1. Create a `config.json` file and drop it in the desired directory. See the example above.

2. Download the `docker-compose.yml` file from the repository.

3. Create `.env` file in the root directory with the following content:

```shell
CONFIG_DIR=/path/to/folder/with/config
```

4. Run the app from the root directory

```shell
docker-compose up -d
```

4. Access the app at `http://localhost:3000`

#### Build the Image

1. Pick a directory for your config location

2. Create a `config.json` file and drop it in the desired directory. See the example above.

3. Build the image

```shell
docker build -t ntfy-workbench .
```

4. Run the image

```shell
docker run -p 3000:3000 -v /path/to/config:/app/config ntfy-workbench
```

5. Access the app at `http://localhost:3000`
