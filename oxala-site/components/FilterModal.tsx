"use client";

import { useId } from "react";
import Dialog from "@/components/Dialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
  typeOptions: string[];
  regionValue: string;
  onRegionChange: (value: string) => void;
  regionOptions: string[];
  yearValue: string;
  onYearChange: (value: string) => void;
  yearOptions: string[];
  labels: {
    filtersTitle: string;
    refineTitle: string;
    typeLabel: string;
    regionLabel: string;
    yearLabel: string;
    allTypeLabel: string;
    allRegionLabel: string;
    allYearLabel: string;
    closeLabel: string;
    applyLabel: string;
    clearLabel: string;
  };
  onClearFilters: () => void;
};

export default function FilterModal(props: Props) {
  const id = useId();
  const { labels } = props;
  const groups = [
    {
      name: "type",
      label: labels.typeLabel,
      options: props.typeOptions,
      value: props.typeValue,
      change: props.onTypeChange,
      all: labels.allTypeLabel,
    },
    {
      name: "region",
      label: labels.regionLabel,
      options: props.regionOptions,
      value: props.regionValue,
      change: props.onRegionChange,
      all: labels.allRegionLabel,
    },
    {
      name: "year",
      label: labels.yearLabel,
      options: props.yearOptions,
      value: props.yearValue,
      change: props.onYearChange,
      all: labels.allYearLabel,
    },
  ];
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      titleId={id}
      closeLabel={labels.closeLabel}
      className="filter-dialog"
    >
      <div className="dialog-heading">
        <p className="eyebrow">{labels.filtersTitle}</p>
        <h2 id={id}>{labels.refineTitle}</h2>
      </div>
      <div className="filter-groups">
        {groups.map((group) => (
          <fieldset key={group.name}>
            <legend>{group.label}</legend>
            <div className="filter-options">
              {group.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`${id}-${group.name}`}
                    value={option}
                    checked={group.value === option}
                    onChange={() => group.change(option)}
                  />
                  <span>{option === "__all" ? group.all : option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="filter-footer">
        <button
          type="button"
          className="text-link"
          onClick={props.onClearFilters}
        >
          {labels.clearLabel}
        </button>
        <button
          type="button"
          className="button button-dark"
          onClick={props.onClose}
        >
          {labels.applyLabel}
        </button>
      </div>
    </Dialog>
  );
}
