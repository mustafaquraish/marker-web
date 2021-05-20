import os
import shutil
import setuptools

setuptools.setup(
    name='marker-web',
    version='1.1.0',
    entry_points={
    'console_scripts': [
            'marker-web = marker_web.__main__:main',
        ],
    },
    author="Mustafa Quraish",
    license="MIT",
    author_email="mustafa@cs.toronto.edu",
    description="Web server for `marker`",
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
