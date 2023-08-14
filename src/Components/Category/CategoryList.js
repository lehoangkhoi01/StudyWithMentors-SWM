import { sortDataByCreatedDate } from "../../Helpers/arrayHelper";
import { useCustomAppbar, useNotification } from "../../Helpers/generalHelper";
import { topicService } from "../../Services/topicService";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  DEACTIVATE_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import { APPBAR_TITLES } from "../../shared/constants/appbarTitles";
import {
  ADMIN_TABLE_HEADER,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  TABLE_ACTION,
  TABLE_TYPE,
} from "../../shared/constants/common";

const CategoryList = () => {
  const { setNotification } = useNotification();
  const { setAppbar } = useCustomAppbar();
  setAppbar(APPBAR_TITLES.CATEGORY_LIST);

  const headerTable = [
    {
      sortable: true,
      property: "name",
      name: ADMIN_TABLE_HEADER.CATEGORY_NAME,
    },
  ];

  const actionItems = [
    {
      imgSrc: require("../../assets/icons/Edit.png"),
      label: TABLE_ACTION.EDIT,
      action: UPSERT_ACTION,
    },
    {
      imgSrc: require("../../assets/icons/Deactive.png"),
      label: TABLE_ACTION.DELETE,
      action: DEACTIVATE_ACTION,
    },
  ];

  const getCategories = async () => {
    try {
      let categories = await topicService.getCategories();
      categories = sortDataByCreatedDate(categories);
      const updatedCategories = categories.map((field) => ({
        ...field,
        translatedStatus: MENTOR_STATUS.ACTIVATED,
      }));

      return updatedCategories;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchCategory = (currentList, searchTerm) => {
    return currentList.filter((mentor) =>
      mentor.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteCategory = async (categoryId) => {
    await topicService.deleteField(categoryId[0]);
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.CATEGORY}
        getData={getCategories}
        filterData={onSearchCategory}
        onDelete={onDeleteCategory}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default CategoryList;
