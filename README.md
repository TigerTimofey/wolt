[![Demo Video](https://img.shields.io/badge/Live%20Demo-Available-blue)](https://youtu.be/-7XJbCREe1M)

# Delivery Order Price Calculator

## <span style="color:rgb(189, 198, 193)">Table of Contents</span>

[📖 About](#about) <br/>
[💻 Installation](#installation) <br/>
[📍Simulate data](#simulate-data-optional) <br/>
[🔧 Versions](#versions) <br/>
[👤 Applicant](#applicant)

## <span style="color:rgb(189, 198, 193)">About</span>

This project implements a web app that calculates the total price of a delivery order, including delivery fees and surcharges, based on user input. The application is built using **React** and **TypeScript**. <br/><br/>
The app fetches venue-related data from the Home Assignment API to calculate the prices for delivery, based on input fields such as cart value and user location.<br/>


https://github.com/user-attachments/assets/a61892d2-3834-433d-8ca0-7e11195e224d


> All the UI is written in CSS, and no additional UI libraries are being used.

## <span style="color:rgb(189, 198, 193)">Installation</span>

Follow these steps to get your development environment set up and running:

### Step 1: Unzip or clone the repository

#### <span style="color: #c2bf93;">Option 1: Unzip the Project</span>

- If you have downloaded the project as a zip file, simply unzip it into your desired directory.

#### <span style="color: #c2bf93;">Option 2: Clone the repository ( <span style="color:rgb(188, 110, 46);">NB!</span> private at the moment)</span>

- Clone the repository to your local machine using the command below:

```bash
git clone https://github.com/TigerTimofey/wolt
```

### Step 2: Once it's cloned, navigate to the project directory:

Check in which directory you are by using `pwd`. Move to delivery directory if you are not there:

```bash
cd delivery
```

### Step 3: Install dependencies

Once you're in the project directory, install the project dependencies using npm:

```bash
npm install
```

### Step 4: Start the development server

Start the development server to run the app in your local browser:

```bash
npm run dev
```

### Step 5: Test the Application

#### Run Tests to Verify Application Functionality

To ensure the application is working as expected, run the tests.

> The main test file can be found at:
> `src/utils/calculations/useDeliveryCalculator.test.tsx`

Use the following command to run the tests:

```bash
npm test
```

### Step 6: Building the Application for Production

To prepare the application for production, run the build command:

```bash
npm run build
```

## <span style="color:rgb(189, 198, 193)">Simulate data (optional)</span>

It is possible to simulate your position to test Functionality. <br/>

> The component: `src/hooks/useLocation.ts`

For example, for Tallinn

- Instead this part of code:

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    setLatitude(position.coords.latitude.toString());
    setLongitude(position.coords.longitude.toString());
  },
  () => setError("Unable to retrieve location."),
  options
);
```

- Use this part of code:

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    // tallinn 0,45 km
    setLongitude((24.759395).toString());
    setLatitude((59.43869).toString());
  },
  () => setError("Unable to retrieve location."),
  options
);
```

## <span style="color:rgb(189, 198, 193)">Versions</span>

| Dependency     | Version |
| -------------- | ------- |
| **React**      | ^18.3.1 |
| **TypeScript** | ~5.6.2  |
| **Vite**       | ^6.0.5  |
| **ts-jest**    | ^29.2.5 |
| **dotenv**     | ^16.4.7 |

## <span style="color:rgb(189, 198, 193)">Applicant</span>

### Timofey Babisashvili <br/>

![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2?style=flat&logo=linkedin&logoColor=white) <br/>**[@Timofey-tech](https://www.linkedin.com/in/timofey-tech)**<br/><br/>
![GitHub](https://img.shields.io/badge/GitHub-%23181717?style=flat&logo=github&logoColor=white) <br/>**[@TigerTimofey](https://github.com/TigerTimofey)** <br/><br/>
![Portfolio](https://img.shields.io/badge/Portfolio-%2316B5D8?style=flat&logo=google-chrome&logoColor=white)<br/> **[Portfolio](https://timofey-tigertimofeys-projects.vercel.app)**
