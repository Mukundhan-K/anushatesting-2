import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from '../ui/Button';
import { getImageSvg } from '../../utility/getImage';
import Api from '../../utility';
import { toast } from 'sonner';

const CommonForm = ({formControls, formData, setFormData, onsubmit, defaultOnSubmit=false, formClass, subject="Mail from Anusha Website",
                      buttonText,btntype="button",btnonclick,btnclass, btnHide=true
}) => {

  const navigate = useNavigate();

  function formDataHandler(e) {
    const {name, value} = e.target;
    console.log(name , value);
    console.log(formData);
    setFormData((prevData)=>(
      {...prevData, [name] : value}
    ));
  };

  async function defaultSubmit(e) {
    try {
      console.log("form data");
      e.preventDefault();

      const formDatas = new FormData(e.target);
      formDatas.append("subject", subject);

        // console.log(e.target, formDatas);
      // for (let [key, value] of formDatas.entries()) {
      //   console.log(key, value);
      // };
      // formData.append("subject", data.name);
      // formData.append("sizes", JSON.stringify(data.sizes));
    
      const response = await Api.post(
        "/api/contact/sendMail",
        formDatas,
        {
          withCredentials: true,
          // headers: { "Content-Type": "multipart/form-data" }
        }
      );
      console.log(response);
      if (response?.data?.success) {
        toast.success(`${response?.data?.message}`);

        if (response.status === 200) {
          navigate('/mail-success-anusha');
        };
        setTimeout(() => {
          setFormData({});
        }, 1500);

        return { success: true };
      };
      toast.error("Failed", {
        description: response?.data?.message || "Something went wrong",
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed", {
        description: error?.response?.data?.message || "Network error",
      });
    };
  };

  function renderInputs(control) {
    let element = null;
    const value = formData[control.name] || "";
    const Icon  = control.icon || null;

    switch (control.componentType) {
      case "input":{
        element = <div className={`bg-white border border-gray-400 px-4 py-0.5 rounded-2xl flex gap-3 items-center group focus-within:border-blue-500 focus-within:bg-blue-50`}>
         
         {Icon && <img src={getImageSvg(Icon)} className="size-8 group-focus-within:stroke-blue-500" alt={`${Icon} icon`} title={`icon of ${Icon}`}/>}

          <input 
            type={control?.type}
            name={control?.name}
            id={control?.name}
            className={(control?.style) || `w-full border-none outline-none py-2 rounded-2xl group-focus:bg-blue-50 ` }
            placeholder={control?.placeholder}
            required
            value = {value}
            onChange = {(e)=>formDataHandler(e)}
            autoComplete={control?.name}
            aria-label={control?.name}
          />
        </div>
        break};

      case "textarea":{
        element = <textarea
          placeholder={control?.placeholder}
          name={control?.name}
          id={control?.name}
          className={(control?.style) || `w-full h-32 border rounded-3xl bg-white border-gray-400 px-4 py-2.5 focus-within:border-blue-500 focus-within:bg-blue-50` }
          value = {value}
          onChange = {(e)=>formDataHandler(e)}
          autoComplete={control?.name}
          aria-label={control?.name}
        />
        break};

      case "select":{
        element = (
            <select id={control?.name} name={control?.name} value={value} onChange={(e)=>formDataHandler(e)} 
              placeholder={control.placeholder} 
              className={`w-full border border-gray-400 px-4 py-2.5 bg-white rounded-2xl focus-within:border-blue-500 focus-within:bg-blue-50`}
              autoComplete={control?.name}
              aria-label={control?.name}
            >
                {(control?.options && control.options.length > 0) ?
                    control.options.map((option)=>(
                  <option key={option.id} value={option.id}>{option.name}</option>)
                )
                : null
              }

            </select>

        )
        break};

      default:{
        element = <input
          type={control?.type}
          placeholder={control?.placeholder}
          name={control?.name}
          id={control?.name}
          className={(control?.style) || `w-full border rounded-lg` }
          onChange = {(e)=>formDataHandler(e)}
        />
        break};
    };

    return element;
  };

  return (

    <form onSubmit={defaultOnSubmit ? defaultSubmit : onsubmit}>
      <div className={formClass}>
        {
          formControls.map((controlItem, i)=>(
            <div key={i} className={`w-full text-left ${(controlItem.componentType == "textarea") && "md:col-span-2"} `}>
              <label htmlFor={`${controlItem?.name}`} className='text-base font-josefin font-medium pb-2 block'>{controlItem.label}</label>
              {
                renderInputs(controlItem)
              }
            </div>
          ))
        }
      </div>
      <Button bttype={btntype}  btnonclick={btnonclick} outcls={btnclass} text={buttonText || "Submit"} btnHide={btnHide}></Button>
            
      {/* Honpot field*/}
      <input
        type="text"
        name="website"
        tabIndex="-1"
        autoComplete="off"
        style={{
          position: "absolute",
          left: "-9999px",
          height: "1px !important",
          width: "1px !important",
          opacity: 0,
        }}
      />
      <input type="hidden" name="formTime" value={Date.now()} />

    </form>
  );
};

export default CommonForm;