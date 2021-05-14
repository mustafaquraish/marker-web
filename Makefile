all:
	echo "Please select a target explicitly."

.PHONY: gui webview app backend frontend

#### Build static files for frontend
gui:
	cd frontend && npm run build

webview: 
	python3 -m marker_web.ui -d testing

#### Run ONLY the backend server
backend:
	python3 -m marker_web.server -d testing

#### Run ONLY the frontend server
frontend:
	cd frontend && npm run serve

#### Create MacOS executable
app:
	python3 extra/freeze-setup.py install --no-chdir