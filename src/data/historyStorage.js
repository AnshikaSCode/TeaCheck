const HISTORY_KEY = "teacheck_history";

export function getHistory() {
  try {
    const savedHistory = localStorage.getItem(HISTORY_KEY);

    if (!savedHistory) {
      return [];
    }

    const history = JSON.parse(savedHistory);

    if (!Array.isArray(history)) {
      return [];
    }

    return history;
  } catch (error) {
    console.error("Could not load TeaCheck history:", error);
    return [];
  }
}

export function saveToHistory(verification) {
  try {
    if (!verification || !verification.claim) {
      return null;
    }

    const existingHistory = getHistory();

    const historyItem = {
      id: verification.id,
      claim: verification.claim,
      verdict: verification.verdict,
      verdictType: verification.verdictType,
      confidence: verification.confidence,
      summary: verification.summary,
      checkedSources: verification.checkedSources,
      supportingSources: verification.supportingSources,
      contradictingSources: verification.contradictingSources,
      neutralSources: verification.neutralSources,
      evidence: verification.evidence || [],
      lastChecked: new Date().toISOString(),
    };

    const filteredHistory = existingHistory.filter(
      (item) => item.claim !== historyItem.claim
    );

    const updatedHistory = [
      historyItem,
      ...filteredHistory,
    ].slice(0, 50);

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );

    return historyItem;
  } catch (error) {
    console.error("Could not save TeaCheck history:", error);
    return null;
  }
}

export function removeFromHistory(id) {
  try {
    const existingHistory = getHistory();

    const updatedHistory = existingHistory.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );

    return updatedHistory;
  } catch (error) {
    console.error(
      "Could not remove TeaCheck history item:",
      error
    );

    return [];
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (error) {
    console.error(
      "Could not clear TeaCheck history:",
      error
    );

    return [];
  }
}