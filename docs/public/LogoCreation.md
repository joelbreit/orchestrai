# Logo Creation

## ~~Generate pngs~~

1. ~~Using Image2Icon, open your logo, export it to PNG, edit the size to 512, and save it as `logo512.png`.~~
2. ~~Do the same but with 192~~
3. ~~Replace the png files in the `public` folder with the new ones.~~

## Generate favicons (just do this)

1. Copy manifest.json in the `public` folder to a temporary location.
2. Remove favicon.ico, logo192.png, logo512.png, and manifest.json from the `public` folder.
3. Using Image2Icon, open your logo, export it to Favicon, leave all sizes selected, and save it. 
4. Move all the favicon... files and manifest.json to the `public` folder.
5. Update the `manifest.json` file with the following:
   1. `short_name` to the name of your app
   2. `name` to the name of your app
   3. `start_url` to "." (probably)
   4. `display` to `"standalone"
   5. `theme_color` to the color of your app
   6. `background_color` to the color of your app

## Update index.html

1. Update the icon to `<link rel="icon" href="%PUBLIC_URL%/favicon-192.png" />`
2. Update the color theme to your color
3. Update the meta description
4. Update the title
5. Remove the comments
