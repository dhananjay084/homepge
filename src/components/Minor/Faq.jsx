import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from '../../assets/faq.png'

const faqs = [
  {
    question: "How long until we deliver your first blog post?",
    answer:
      "Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now. In built table in an rapid blush. Merits behind on afraid or warmly.",
  },
  {
    question: "How long until we deliver your first blog post?",
    answer: "",
  },
  {
    question: "How long until we deliver your first blog post?",
    answer: "",
  },
  {
    question: "How long until we deliver your first blog post?",
    answer: "",
  },
];

const FAQAccordion = ({data}) => {
  if (!data) return null; 

  const [expanded, setExpanded] = useState(false);

  const handleChange = (index) => (_, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
        Frequently Ask Questions
      </h2>
      <div className="sm:grid sm:grid-cols-2 ">
        <img src={Image} className="hidden sm:block"/>
      <div className="space-y-4">
        {data.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            className={`rounded-lg shadow-lg ${
              expanded === index ? "border border-gray-300" : ""
            }`}
            sx={{
              "&.MuiPaper-root": {
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                border: expanded === index ? "1px solid #ccc" : "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === index ? (
                  <RemoveIcon className="text-[#592EA9]" />
                ) : (
                  <AddIcon className="text-[#592EA9]" />
                )
              }
              className={`px-6 py-4 ${
                expanded === index ? "border-b border-gray-200" : ""
              }`}
            >
              <Typography
                className={`font-semibold text-lg ${
                  expanded === index ? "text-[#592EA9]" : "text-gray-900"
                }`}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            {faq.answer && (
              <AccordionDetails className="px-6 py-4 text-gray-600">
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
