import { useCallback, useEffect, useRef, useState } from "react";

const useDynamicHeight = (items: any[], itemCount: number, gap: number = 0) => {
	const itemRef = useRef<any>(null);
	const [itemHeight, setItemHeight] = useState<number>(0);
	const [totalHeight, setTotalHeight] = useState<number>(0);

	const calculateHeights = useCallback(() => {
		if (itemRef.current) {
			const height = itemRef.current.offsetHeight;
			setItemHeight(height);
			setTotalHeight(height * items.length + gap * (items.length - 1));
		}
	}, [items, gap]);

	useEffect(() => {
		calculateHeights();
		window.addEventListener("resize", calculateHeights);
		return () => window.removeEventListener("resize", calculateHeights);
	}, [calculateHeights]);

	const collapsedHeight = itemHeight * itemCount + gap * (itemCount - 1);

	return { itemRef, collapsedHeight, totalHeight };
};

export default useDynamicHeight;
