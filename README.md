# Sparkline.PCF
Sparkline PCF (PowerApps Component framework) Control based on react-sparlines)

Will display an array of numbers as a sparkline.

# Dependencies
react-sparklines : http://borisyankov.github.io/react-sparklines/

# Parameters
| Parameter         | Description                                                                                  | Default |
|-------------------|----------------------------------------------------------------------------------------------|---------|
| Values            | Array of numbers to display.                                                                 |         |
| Separator         | Separator between each values                                                                | ,       |
| Color             | Color of the sparkline. Supports literal (ex. blue, red) and RGBA color codes (ex. #da9494)  | blue    |
| Height            | Height in pixels                                                                             | 100     |
| Width             | Width in pixel                                                                               | 300     |
| SparkType         | Type of the sparkline (Line, Rounded, Bars)                                                  | Line    |
| Fill              | Fill under the line (true, false)                                                            | true    |
| ReferenceLine     | Display a reference line (true, false)                                                       | false   |
| ReferenceLineType | Type of the reference line (Mean, Avg, Min, Max, Median)                                     | Mean    |

# Screenshots
![alt text](https://github.com/drivardxrm/Sparkline.PCF/blob/master/sparkline.png?raw=true)

![alt text](https://github.com/drivardxrm/Sparkline.PCF/blob/master/sparkline.gif?raw=true)

# Installation
You can install the component directly with the provided files

https://github.com/drivardxrm/Sparkline.PCF/blob/master/Sparkline_1_0_0_0.zip  (Unmanaged solution)

https://github.com/drivardxrm/Sparkline.PCF/blob/master/Sparkline_1_0_0_0_managed.zip (Managed solution)

# Get required tools

To use Microsoft PowerApps CLI, do the following:

* Install Npm (comes with Node.js) or install Node.js (comes with npm). We recommend LTS (Long Term Support) version 10.15.3 LTS as it seems to be most stable.

* Install .NET Framework 4.6.2 Developer Pack.

* If you don’t already have Visual Studio 2017 or later, follow one of the options below:

  * Option 1: Install Visual Studio 2017 or later.
  * Option 2: Install .NET Core 2.2 SDK and then install Visual Studio Code.
* Install Microsoft PowerApps CLI.

Be sure to update your Microsoft PowerApps CLI to the latest version: 
```bash
pac install latest
```
# Build the control

* Clone the repo/ download the zip file.
* Navigate to ./TimePicker/ folder.
* Copy the folder path and open it in visual studio code.
* Open the terminal, and run the command the following command to install the project dependencies:
```bash
npm install
```
Then run the command:
```bash
npm run start
```
# Build the solution

* Create a new solution folder and open the Developer command prompt.
* Change the directory to the newly created folder in previous step.
* Init the future solution:
```bash
pac solution init --publisherName someName --customizationPrefix someSolutionPrefix
``` 
* Add the control to your future solution:
```bash
pac solution add-reference --path provide path of control project folder where the pcf.proj is available
``` 
* Build 1/2:
```bash
msbuild /t:restore
``` 
* Build 2/2:
```bash
msbuild
``` 
* You will have the solution file in SolutionFolder/bin/debug folder!

If you want to change the solution type you have to edit the .cdsproj file:
```bash
Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>

  ```
