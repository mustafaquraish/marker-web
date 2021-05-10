all:
	echo "Please select a target explicitly."

.PHONY: gui serve noweb app

gui:
	cd frontend && npm run build

webview: 
	python3 backend/main.py -d backend/testing

#### Run ONLY the backend server
backend:
	python3 backend/main.py noweb -d backend/testing

#### Run ONLY the frontend server
frontend:
	cd frontend && npm run serve

#### Compile .app file for MacOS
app:
	python3 setup.py py2app --no-chdir
