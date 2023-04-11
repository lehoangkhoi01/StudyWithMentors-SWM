import { DATE_FORMAT, OTHERS } from "../../shared/constants/common";
import { convetDateFormat } from "../dateHelper";

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
        title: `${section.position} ${OTHERS.AT} ${
          section.company
        } (${convetDateFormat(
          section.startDate,
          DATE_FORMAT.YYYY_MM_DD,
          DATE_FORMAT.MM_YYYY
        )} - ${
          section.workingHere
            ? OTHERS.CURRENT
            : convetDateFormat(
                section.endDate,
                DATE_FORMAT.YYYY_MM_DD,
                DATE_FORMAT.MM_YYYY
              )
        })`,
        description: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.LEARNING_EXPL: {
      return data.map((section) => ({
        title: `${section.major} ${OTHERS.AT} ${
          section.school
        } (${convetDateFormat(
          section.startDate,
          DATE_FORMAT.YYYY_MM_DD,
          DATE_FORMAT.MM_YYYY
        )} - ${convetDateFormat(
          section.endDate,
          DATE_FORMAT.YYYY_MM_DD,
          DATE_FORMAT.MM_YYYY
        )})`,
        description: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.SOCIAL_ACT: {
      return data.map((section) => ({
        title: `${section.position} ${OTHERS.AT} ${
          section.organization
        } (${convetDateFormat(
          section.startDate,
          DATE_FORMAT.YYYY_MM_DD,
          DATE_FORMAT.MM_YYYY
        )} - ${
          section.attendingThis
            ? OTHERS.CURRENT
            : convetDateFormat(
                section.endDate,
                DATE_FORMAT.YYYY_MM_DD,
                DATE_FORMAT.MM_YYYY
              )
        })`,
        description: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.ACHIEVEMENT: {
      return data.map((section) => ({
        title: `${section.name} ${OTHERS.BELONG} ${
          section.organization
        } (${convetDateFormat(
          section.achievingDate,
          DATE_FORMAT.YYYY_MM_DD,
          DATE_FORMAT.MM_YYYY
        )})`,
        description: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.CERT: {
      return data.map((section) => ({
        title: `${section.name} ${OTHERS.BELONG} ${
          section.organization
        } (${convetDateFormat(
          section.achievingDate,
          DATE_FORMAT.YYYY_MM_DD,
          DATE_FORMAT.MM_YYYY
        )})`,
        description: section.description,
      }));
    }

    case INDEX_OF_CV_PROPERTY.SKILL: {
      return data.map((section) => ({
        title: section.name,
        description: section.description,
      }));
    }

    default:
      return null;
  }
};
