export const addPrevValue = (log, prevLog) => {
	return log?.times?.map((timeItem, index) => ({
		...timeItem,
		prevWeight: prevLog?.times?.[index]?.weight || 0,
		preRepeat: prevLog?.times?.[index]?.repeat || 0
	}))
}
