import {
  useFetchTopicFieldsAndCategories,
  useNotification,
} from "../../Helpers/generalHelper";
import { topicService } from "../../Services/topicService";
import CustomizedTable from "../../shared/components/Table/CustomizedTable";
import {
  DEACTIVATE_ACTION,
  UPSERT_ACTION,
} from "../../shared/constants/actionType";
import {
  ADMIN_TABLE_HEADER,
  ERROR_MESSAGES,
  MENTOR_STATUS,
  TABLE_ACTION,
  TABLE_TYPE,
} from "../../shared/constants/common";

const FieldList = () => {
  const { getTopicFields } = useFetchTopicFieldsAndCategories();
  const { setNotification } = useNotification();

  const headerTable = [
    {
      sortable: true,
      property: "name",
      name: ADMIN_TABLE_HEADER.FIELD_NAME,
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
      label: TABLE_ACTION.DEACTIVATE,
      action: DEACTIVATE_ACTION,
    },
  ];

  const getFields = async () => {
    try {
      const fields = await getTopicFields();

      const updatedFields = fields.map(field => ({
        ...field,
        translatedStatus: MENTOR_STATUS.ACTIVATED
      }))

      return updatedFields;
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        message: ERROR_MESSAGES.COMMON_ERROR,
      });
    }
  };

  const onSearchField = (currentList, searchTerm) => {
    return currentList.filter((mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onDeleteField = async (fieldId) => {
    await topicService.deleteField(fieldId);
  };

  const onActiveField = async (fieldId, data) => {
    await topicService.updateField(data, fieldId);
  };

  return (
    <div>
      <CustomizedTable
        type={TABLE_TYPE.FIELD}
        getData={getFields}
        filterData={onSearchField}
        onDelete={onDeleteField}
        onActive={onActiveField}
        headerTable={headerTable}
        actionItems={actionItems}
      />
    </div>
  );
};

export default FieldList;
