import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { getImageSvg } from "../../utility/getImage";

const ProjectCard = ({ id, images, location, title, status }) => {

  // Memoize background style (IMPORTANT)
  const cardStyle = useMemo(
    () => ({
      backgroundImage: `url(${images})`,
      backgroundColor: "#0008",
      backgroundBlendMode: "multiply",
    }),
    [images]
  );

  const statusClass =
    status === "completed" ? "bg-green-400" : "bg-a-royalsafforn";

  return (
    <NavLink
      to={id}
      className="
        h-full rounded-3xl bg-white cursor-pointer
        transition-all duration-500 bg-cover bg-bottom-right bg-no-repeat
        flex flex-col
      "
      style={cardStyle}
      aria-label={`View project ${title}`}
    >
      {/* Status */}
      <div className="flex justify-end pr-8 pt-8">
        <span
          className={`px-5 py-2 rounded-full text-white ${statusClass}`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="h-[250px] md:h-[350px] p-5 flex flex-col justify-end gap-4">
        <div className="bg-white p-2 md:p-3 rounded-2xl">
          <div className="w-full flex gap-2 items-end border-b pb-2 mb-2 border-gray-300">
            <div className="size-6 rounded-full bg-a-royalsafforn grid place-items-center">
              <img
                src={getImageSvg("location")}
                className="size-4 object-contain"
                loading="lazy"
                alt="Location icon"
              />
            </div>
            <span className="text-sm">{location}</span>
          </div>

          <h2 className="text-xl md:text-3xl xl:text-4xl flex justify-between items-end">
            {title}
            <div className="bg-a-royalsafforn p-2! rounded-full">
              <img
                src={getImageSvg("arrow-white")}
                className="size-4 object-contain rotate-180"
                loading="lazy"
                alt="Location icon"
              />
            </div>
          </h2>
        </div>
      </div>
    </NavLink>
  );
};

export default memo(ProjectCard);
