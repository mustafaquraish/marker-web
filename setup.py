import os
import shutil
import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name='marker-web',
    version='1.1.2',
    entry_points={
    'console_scripts': [
            'marker-web = marker_web.__main__:main',
        ],
    },
    author="Mustafa Quraish",
    license="MIT",
    author_email="mustafa@cs.toronto.edu",
    description="Web server for `marker`",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/mustafaquraish/marker-web",
    packages=setuptools.find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'marker>=2.1.0', 'flask', 'flask_cors'
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: Unix",
    ],
)
