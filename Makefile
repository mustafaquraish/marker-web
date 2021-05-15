######### Please select a target explicitly from:
#
#    frontend: Run Vue.js CLI dev server
#     backend: Run flask server to test marker-web
#         gui: Build frontend into static, marker_web/gui/
#     webview: Run built `marker-web` in pywebview
#         app: (MacOS) Build executable app with py2app
#
############################################################

.PHONY: gui webview app backend frontend all

#### Build static files for frontend
gui:
	cd frontend && npm run build

webview: 
	python3 extra/ui.py -d testing

#### Run ONLY the backend server
backend:
	python3 -m marker_web.server -d testing

#### Run ONLY the frontend server
frontend:
	cd frontend && npm run serve

#### Create MacOS executable
app:
	python3 extra/freeze-setup.py py2app --no-chdir

clean:
	rm -rf dist/ build/