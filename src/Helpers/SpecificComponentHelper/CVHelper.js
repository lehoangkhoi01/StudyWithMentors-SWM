import {
  CV_REGISTER_NAME_PREFIX,
  DATE_FORMAT,
  OTHERS,
  PROFILE_TITLES,
} from "../../shared/constants/common";
import { convertDateFormat } from "../dateHelper";

const INDEX_OF_CV_PROPERTY = {
  DESCRIPTION: 0,
  WORKING_EXP: 1,
  LEARNING_EXPL: 2,
  SOCIAL_ACT: 3,
  ACHIEVEMENT: 4,
  CERT: 5,
  SKILL: 6,
};

export const mapCVSection = (data, indexOfProperty) => {
  switch (indexOfProperty) {
    case INDEX_OF_CV_PROPERTY.DESCRIPTION: {
      return [{ detail: data }];
    }

    case INDEX_OF_CV_PROPERTY.WORKING_EXP: {
      return data.map((section) => ({
        title: `${section.position} ${OTHERS.AT} ${section.company
          } (${convertDateFormat(
            section.startDate,
            DATE_FORMAT.BACK_END_YYYY_MM_DD,
            DATE_FORMAT.MM_YYYY
          )} - ${section.workingHere
            ? OTHERS.CURRENT
            : convertDateFormat(
              section.endDate,
              DATE_FORMAT.BACK_END_YYYY_MM_DD,
              DATE_FORMAT.MM_YYYY
            )
          })`,
        detail: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.LEARNING_EXPL: {
      return data.map((section) => ({
        title: `${section.major} ${OTHERS.AT} ${section.school
          } (${convertDateFormat(
            section.startDate,
            DATE_FORMAT.BACK_END_YYYY_MM_DD,
            DATE_FORMAT.MM_YYYY
          )}  ${section.endDate ? `- ${section.workingHere
            ? OTHERS.CURRENT
            : convertDateFormat(
              section.endDate,
              DATE_FORMAT.BACK_END_YYYY_MM_DD,
              DATE_FORMAT.MM_YYYY
            )
            }` : ''}
          )`,
        detail: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.SOCIAL_ACT: {
      return data.map((section) => ({
        title: `${section.position} ${OTHERS.AT} ${section.organization
          } (${convertDateFormat(
            section.startDate,
            DATE_FORMAT.BACK_END_YYYY_MM_DD,
            DATE_FORMAT.MM_YYYY
          )} - ${section.attendingThis
            ? OTHERS.CURRENT
            : convertDateFormat(
              section.endDate,
              DATE_FORMAT.BACK_END_YYYY_MM_DD,
              DATE_FORMAT.MM_YYYY
            )
          })`,
        detail: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.ACHIEVEMENT: {
      return data.map((section) => ({
        title: `${section.name} ${OTHERS.BELONG} ${section.organization
          } (${convertDateFormat(
            section.achievingDate,
            DATE_FORMAT.BACK_END_YYYY_MM_DD,
            DATE_FORMAT.MM_YYYY
          )})`,
        detail: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.CERT: {
      return data.map((section) => ({
        title: `${section.name} ${OTHERS.BELONG} ${section.organization
          } (${convertDateFormat(
            section.achievingDate,
            DATE_FORMAT.BACK_END_YYYY_MM_DD,
            DATE_FORMAT.MM_YYYY
          )})`,
        detail: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.SKILL: {
      return data.map((section) => ({
        title: section.name,
        detail: section.description,
      }));
    }

    default:
      return null;
  }
};

export const getRegisterNamePrefixFromTitle = (title) => {
  switch (title) {
    case PROFILE_TITLES.INTRODUCION:
      return CV_REGISTER_NAME_PREFIX.INTRODUCION;
    case PROFILE_TITLES.EXPERIENCE:
      return CV_REGISTER_NAME_PREFIX.EXPERIENCE;
    case PROFILE_TITLES.STUDY_PROGRESS:
      return CV_REGISTER_NAME_PREFIX.STUDY_PROGRESS;
    case PROFILE_TITLES.ACTIVITIES:
      return CV_REGISTER_NAME_PREFIX.ACTIVITIES;
    case PROFILE_TITLES.ACHIEVEMENT:
      return CV_REGISTER_NAME_PREFIX.ACHIEVEMENT;
    case PROFILE_TITLES.CERTIFICATES:
      return CV_REGISTER_NAME_PREFIX.CERTIFICATES;
    case PROFILE_TITLES.SKILLS:
      return CV_REGISTER_NAME_PREFIX.SKILLS;
    default:
      return CV_REGISTER_NAME_PREFIX.INTRODUCION;
  }
};

export const removeRegisterNamePrefix = (section, prefix) => {
  let result = {};

  Object.keys(section).map((key) => {
    result[key.split(`${prefix}_`)[1]] = section[key];
  });

  return result;
};

export const findLastestWorkingExp = (workingExps) => {
  if (workingExps.length === 0) {
    return null;
  }

  let isWorkingHere = false;
  let latestEndDateObj = workingExps[0];

  for (let i = 1; i < workingExps.length; i++) {
    if (!isWorkingHere) {
      if (workingExps[i].workingHere) {
        latestEndDateObj = workingExps[i];
        isWorkingHere = true
      } else if (
        workingExps[i].endDate &&
        workingExps[i].endDate > latestEndDateObj.endDate
      ) {
        latestEndDateObj = workingExps[i];
      }
    }
  }

  return latestEndDateObj;
};

export const sortWorkingExps = (workingExps) => {
  const sortedList = workingExps.map((el) => {
    return { ...el, convertedEndDate: new Date(el.endDate ?? new Date()) };
  });

  sortedList.sort((a, b) => b.convertedEndDate - a.convertedEndDate)

  return sortedList;
}
