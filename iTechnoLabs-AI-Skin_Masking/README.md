# iTechnoLabs-AI-Skin_Masking
The tool helps the user to mask the skin of a person.
## Install dependencies

    python3 -m pip install virtualenv

    virtualenv modes_env   or  python -m venv modes_env

    source modes_env/bin/activate
    
    cd masking-application

    pip install -r requirements.txt

## Setup Models
Download the models from https://drive.google.com/drive/folders/1EbTAFkBOMjXsCzM9USCByOmmtvekP1EO?usp=sharing
and add the folder as below in the folder structure of the project
![image](https://user-images.githubusercontent.com/46050541/127441719-5a28f316-7669-49f0-82b2-bd916c2ae0ba.png)
The models should contain following files :
![image](https://user-images.githubusercontent.com/46050541/127441825-84a0d5c3-e78e-43e8-b33c-3e1edc5cbdaf.png)

## Execution Code
      $ python main.py --img_path "input/77.jpeg" --output_path "output/output.jpeg"

## Output:
```
The output will be generated in the output folder with masked image in it.
