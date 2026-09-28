# River survey: offline iPad app

An offline version of the Bradshaw model river survey. Once installed on an iPad it opens and works with no signal, even after a restart. Nothing is uploaded anywhere: each iPad keeps its own data until it's exported.

## 1. Put it on GitHub Pages (once, about 5 minutes)

1. On github.com, click **New repository**. Call it `river-survey`, set it to **Public**, and create it.
2. Click **uploading an existing file**. Drag in **all the files from this folder** (not the folder itself), then click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and click **Save**.
4. After a minute or two the page shows your app's address, something like
   `https://YOUR-USERNAME.github.io/river-survey/`

The repository only holds the app. Students' data never goes to GitHub.

## 2. Set your groups, sites and flow meter calibration

Open `setup.json` on GitHub, click the pencil icon to edit, and change it, for example:

```json
{
  "groups": ["Group 1", "Group 2", "Group 3", "Group 4", "Group 5"],
  "sites": [
    {"name": "Site 1", "dist": 150},
    {"name": "Site 2", "dist": 600},
    {"name": "Site 3", "dist": 1100},
    {"name": "Site 4", "dist": 1700},
    {"name": "Site 5", "dist": 2400}
  ],
  "calibration": {"a": 0.25, "b": 0.02, "unit": "s"}
}
```

- `dist` is the distance from the source in metres. Leave it as `null` if you want students to measure it.
- `calibration` is the formula from your flow meter's sheet: velocity = a × revolutions per second (or `"min"` for per minute) + b. Leave `a` as `null` to let students enter it.
- Use the **same site names** as in the online survey's Teacher tab, so imported data lines up with the right sites.

Click **Commit changes**. iPads pick up the change the next time the app is opened with Wi-Fi (open it, close it, open it again).

## 3. Install on each iPad (with Wi-Fi, before the trip)

1. Open the app's address in **Safari**.
2. Tap **Share**, then **Add to Home Screen**, then **Add**.
3. Open the app **from the new icon** once while still on Wi-Fi. This saves everything it needs.
4. Test it: switch on Airplane Mode, close the app, open it again. It should load normally.

## 4. At the river

Students choose their group and site from the lists and record as normal. Everything saves on the iPad as they go, including photos.

## 5. Back at school

1. On each iPad: **All sites → Export survey file**, then AirDrop the file to yourself.
2. Open the online survey page, go to **All sites → Import survey files**, and select all the files at once.
3. All groups' data, including photos, is then in the shared survey for the class averages, box plots, Spearman's rank and reliability checks. Importing the same file twice updates the sites instead of duplicating them.

## Important

- **Deleting the home-screen icon deletes that iPad's data.** Export first.
- Clearing Safari's history and website data can also remove it.
- Keep an iPad plugged in or charged. The paper recording sheet (in the Record a site tab, and in this folder) is the backup.
