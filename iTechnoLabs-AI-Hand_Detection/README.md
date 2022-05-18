# iTechnoLabs-Hand Detection
The tool helps the user to detect hands on an image.
## Install dependencies

    python3 -m pip install virtualenv

    virtualenv modes_env   or  python -m venv modes_env

    source modes_env/bin/activate
    
    cd masking-application

    pip install -r requirements.txt

## Execution Code
      $ python hand_detection.py --img_path "input/hands.jpeg" --output_path "output/hands_out.jpeg"


## Output:
```
The output will be generated in the output folder with marked hands on it.
