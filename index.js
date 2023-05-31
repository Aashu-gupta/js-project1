let dateOfBirth;
//element  for toggle setting icon
const settingIcon = document.getElementById("settingIcon");
const settingContent = document.getElementById("settingContent");

//element for taking dob as input
const dobInput = document.getElementById("dobInput");
const dobBtn = document.getElementById("dobBtn");

//elements for toggling screen (container)
const initialText = document.getElementById("initialText");
const afterDobText = document.getElementById("afterDobText");

//element to get day year and month from page
const p_year = document.getElementById("p_year");
const p_month = document.getElementById("p_month");
const p_day = document.getElementById("p_day");

//! functions

//toggleScreen fxn to change screen             //?7
const toggleScreen = () => {
  initialText.classList.add("hide");
  afterDobText.classList.remove("hide");
};

//fxn to make no. in two digit                    //?6
const makeTwoDigitNo = (number) => {
  return number > 9 ? number : `0${number}`;
};

//fxn to update screen                        //?5
function updateScreen(calculated_year, calculated_month, calculated_date) {
  p_year.innerHTML = makeTwoDigitNo(calculated_year);
  p_month.innerHTML = makeTwoDigitNo(calculated_month);
  p_day.innerHTML = makeTwoDigitNo(calculated_date);
}

// fxn to find age                                             //?4
function findAge(
  current_date,
  current_month,
  current_year,
  birth_date,
  birth_month,
  birth_year
) {
  // days of every month
  month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // if birth date is greater than current date
  // then do not count this month and add 30
  // to the date so as to subtract the date and
  // get the remaining days
  if (birth_date > current_date) {
    current_date = current_date + month[birth_month - 1];
    current_month = current_month - 1;
  }

  // if birth month exceeds current month, then do
  // not count this year and add 12 to the month so
  // that we can subtract and find out the difference
  if (birth_month > current_month) {
    current_year = current_year - 1;
    current_month = current_month + 12;
  }

  // calculate date, month, year
  let calculated_date = current_date - birth_date;
  let calculated_month = current_month - birth_month;
  let calculated_year = current_year - birth_year;

  console.log(calculated_year, calculated_month, calculated_date);
  updateScreen(calculated_year, calculated_month, calculated_date);
}

// fxn to get mathematical value of dates                                   //?3
const getDates = () => {
  const currentDate = new Date();
  console.log("currentdate " + currentDate);
  console.log("dob " + dateOfBirth);
  let current_year = currentDate.getFullYear();
  let current_month = currentDate.getMonth() + 1;
  let current_date = currentDate.getDate();
  let birth_year = dateOfBirth.getFullYear();
  let birth_month = dateOfBirth.getMonth() + 1;
  let birth_date = dateOfBirth.getDate();

  console.log(
    current_year,
    current_month,
    current_date,
    birth_year,
    birth_month,
    birth_date
  );
  findAge(
    current_date,
    current_month,
    current_year,
    birth_date,
    birth_month,
    birth_year
  );
};

// dob function to set dob                      //?2
const setDob = () => {
  const dobValue = dobInput.value;
  //dateOfBirth = dobValue? new Date(dobValue): null;        //stringfy date value
  dateOfBirth = new Date(dobValue);
  //   console.log(dobValue); // console the date
  //   console.log(dateOfBirth); // console the date with day
  // localStorageSetter(dateOfBirth); // set tavlue in local storage
  getDates();
  toggleScreen(); // run toggle screen fxn
};

//toggle function to toggle setting icon        //?1
const toggleSetting = () => {
  settingContent.classList.remove("hide");
};

settingIcon.addEventListener("click", toggleSetting); //setting icon click run fxn
dobBtn.addEventListener("click", setDob); //dob button click
