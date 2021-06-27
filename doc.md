rm -rf node_modules/
rm -rf .git
rm -rf yarn.lock
для удаление yarn и использование npm

package.json можно указать
`npm run start ---prefix [name file]`
для перехода в файл и активации скрипта

библиотека concurrently может активировать несколько скриптов одновременно
`"dev": "concurrently \"npm run server\" \"run client\""`
