## Example of data fetching :

````
fetchTaskRules(
    sandboxVersionId: string,
    eelFilter: EELFilter,
    sortRequest: SortsInput,
    pageRequest: PageInput
): Observable<PagedResponse<CsMultipleTaskRule>> {
    const eel = eelFilter.root.accept(this.eelIsoDateRewriter).toString();
    return this.csSandboxTaskRuleListGQL
        .watch(
            {
                sandboxVersionId,
                filter: { eel },
                page: pageRequest,
                sort: sortRequest,
            },
            { fetchPolicy: 'network-only' }
        )
        .valueChanges.pipe(
            map(({ data }) => data.searchCsMultipleTaskRule),
            map(({ edges, page }) => ({
                edges,
                pageInfo: {
                    start: page?.start ?? 0,
                    limit: page?.limit ?? 0,
                    outOf: page?.outOf ?? 0,
                },
            })),
            catchError((e) => {
                console.error(e);
                this.notificationService.showDefaultServerError();
                return EMPTY;
            })
        );
}
````
