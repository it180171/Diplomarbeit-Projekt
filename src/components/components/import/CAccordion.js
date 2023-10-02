import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { styled } from '@mui/material/styles';
import '../../style/accordion.css';

const CAccordion = ({ summary, detail, expanded }) => {
  return (
    <Accordion className="normalAccordion" defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>
        {detail}
      </AccordionDetails>
    </Accordion>
  )
}

const CAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export const SAccordion = ({ summary, detail, expanded, icon = true }) => {
  return (
    <Accordion defaultExpanded={expanded}>
      <CAccordionSummary
        expandIcon={icon && <ExpandMoreIcon />}>
        {summary}
      </CAccordionSummary>
      <AccordionDetails>
        {detail}
      </AccordionDetails>
    </Accordion>
  )
}

export default CAccordion;