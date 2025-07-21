import { useSelector } from "react-redux"
import { defineAbilityFor } from "../../permissions";
import MultiStepForm from ".";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

const WithRoleMultiPageForm = () => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.auth);
  const ability = defineAbilityFor(user.role);

  if (pathname.includes('/create')) {
    return ability.can('create', 'Order')
      ? <MultiStepForm isEditable={true} />
      : <Navigate to="/unauthorized" replace />;
  }
  else if(ability.can('edit','Order')){
    return (<MultiStepForm isEditable={true} />);
  }
  else if(ability.can('read','Order')){
    return (<MultiStepForm isEditable={false} />);
  }
  else{
    <Navigate to="/unauthorized" replace />;
  }

}

export default WithRoleMultiPageForm;