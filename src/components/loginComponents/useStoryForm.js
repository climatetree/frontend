import { useState, useEffect } from 'react';
import {
  fetchAllMediaTypes,
  fetchAllSectors,
  fetchAllSolutions
} from './helper';

const defaultValue = {
  strategy: "Other",
  sector: "Other",
  solution: "Other",
  mediaType: "Other",
};

export default function useStoryForm(initValues = defaultValue) {
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMsg, setErroMsg] = useState("");
  const [strategy, setStrategy] = useState(initValues.strategy);
  const [sector, setSector] = useState(initValues.sector);
  const [allSectors, setAllSectors] = useState([]);
  const [solution, setSolution] = useState(initValues.solution);
  const [allSolutions, setAllSolutions] = useState([]);
  const [mediaType, setMediaType] = useState(initValues.mediaType);
  const [allMediaTypes, setAllMediaTypes] = useState([]);
  useEffect(() => {
    (async () => {
      setAllMediaTypes(await fetchAllMediaTypes());
      setAllSectors(await fetchAllSectors());
      setAllSolutions(await fetchAllSolutions());
    })();
  }, []);
  const handleStrategySelection = async (value) => {
    setStrategy(value);
    setSector("Other");
    setSolution("Other");
    if (value) {
      const res = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/strategy/${value}`);
      const data = await res.json();
      const sectors = new Set(data.map(({ sector }) => sector));
      const solutions = new Set(data.map(({ solution }) => solution));
      setAllSectors([...sectors]);
      setAllSolutions([...solutions]);
    } else {
      setAllSectors(await fetchAllSectors());
      setAllSolutions(await fetchAllSolutions());
    }
  }
  const handleSectorSelection = async (value) => {
    setSector(value);
    setSolution("Other");
    if (value !== "Other") {
      const res = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/sector/${value}`);
      const data = await res.json();
      const strategy = data[0].strategy;
      const solutions = new Set(data.map(({ solution }) => solution));
      setStrategy(strategy);
      setAllSolutions([...solutions]);
    }
  }
  const handleSolutionSelection = async (value) => {
    setSolution(value);
    if (value !== "Other") {
      const res = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/solution/${value}`);
      const data = await res.json();
      setStrategy(data[0].strategy);
      setSector(data[0].sector);
    }
  }
  return {
    submitStatus, setSubmitStatus,
    errorMsg, setErroMsg,
    strategy, setStrategy,
    sector, setSector, allSectors, setAllSectors,
    solution, setSolution, allSolutions, setAllSolutions,
    mediaType, setMediaType, allMediaTypes, setAllMediaTypes,
    handleStrategySelection,
    handleSectorSelection,
    handleSolutionSelection,
  }
}