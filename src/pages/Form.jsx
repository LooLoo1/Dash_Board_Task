import PropTypes from "prop-types";
import { Forma } from "../components";

const Form = ({ edit }) => {
	return <Forma edit={edit} />;
};

Form.propTypes = {
	edit: PropTypes.bool,
};

export default Form;
