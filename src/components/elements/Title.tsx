import React from "react";

interface TitleProps {
  pageTitle: string;
}

const Title: React.FC<TitleProps> = ({ pageTitle }) => {
  return (
    <React.Fragment>
      <h1 className="center-content leading-4 font-semibold text-2xl">
        {pageTitle}
      </h1>
      <div className="underline mt-8"></div>
    </React.Fragment>
  );
};

export default Title;
